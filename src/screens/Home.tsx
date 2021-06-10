import React from "react";
import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import CoffeeShop from "../components/CoffeeShop";
import Loader from "../components/Loader";
import { SEE_COFFEE_SHOPS } from "../components/Queries";

function Home() {
  const history = useHistory();
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
              loader={<span>Loading...</span>}
            >
              {data?.seeCoffeeShops?.map((shops: any) => (
                <CoffeeShop {...shops} key={shops.id} />
              ))}
            </InfiniteScroll>
          )
        : null}

      <button onClick={() => logUserOut(history)}>Log out now</button>
    </div>
  );
}

export default Home;
