import React from "react";
import PageTitle from "../components/PageTitle";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import CoffeeShops from "../components/home/CoffeeShops";
import Loader from "../components/Loader";
import { SEE_COFFEE_SHOPS } from "../components/Queries";

function Home() {
  const { data, loading, fetchMore } = useQuery(SEE_COFFEE_SHOPS, {
    variables: {
      offset: 0,
    },
  });

  const onLoadMore = () => {
    fetchMore({
      variables: {
        offset: data?.seeCoffeeShops?.length,
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seeCoffeeShops: [
            ...prev.seeCoffeeShops,
            ...fetchMoreResult.seeCoffeeShops,
          ],
        });
      },
    });
  };

  return (
    <div>
      <PageTitle title="Home | NomadCoffee" />
      {loading && <Loader />}
      {data?.seeCoffeeShops?.length > 0
        ? data?.seeCoffeeShops && (
            <InfiniteScroll
              dataLength={data?.seeCoffeeShops?.length}
              next={onLoadMore}
              hasMore={true}
              loader={<Loader />}
            >
              {data?.seeCoffeeShops?.map((shops: any) => (
                <CoffeeShops {...shops} key={shops.id} />
              ))}
            </InfiniteScroll>
          )
        : null}
    </div>
  );
}

export default Home;
