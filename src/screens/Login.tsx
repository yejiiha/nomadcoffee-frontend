import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import SubmitBtn from "../components/auth/SubmitBtn";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import ErrorMessage from "../components/auth/ErrorMessage";
import Title from "../components/auth/Title";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { login, loginVariables } from "../__generated__/login";
import PageTitle from "../components/PageTitle";
import { logUserIn } from "../apollo";

interface ILoginInput {
  username: string;
  password: string;
  loginError: string;
}

interface LocationState {
  message: string;
  username: string;
  password: string;
}

const Notification = styled.div`
  color: #2ecc71;
  margin-top: 30px;
  font-weight: 600;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const location = useLocation<LocationState>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<ILoginInput>({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const onCompleted = (data: any) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("loginError", { message: error });
    }

    if (ok && token) {
      logUserIn(token);
    }
  };
  const [loginMutation, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid: SubmitHandler<ILoginInput> = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();

    loginMutation({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login | NomadCoffee" />
      <FormBox>
        <Title />
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 3,
                message: "Username should be longer than 3 chars.",
              },
            })}
            name="username"
            type="text"
            hasError={Boolean(errors.username?.message)}
            placeholder="Username"
            onFocus={() => clearErrors()}
          />
          <ErrorMessage message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            name="password"
            type="password"
            hasError={false}
            placeholder="Password"
            onFocus={() => clearErrors()}
          />

          <SubmitBtn
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!isValid || loading}
          />
          <ErrorMessage message={errors?.loginError?.message} />
        </form>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
}

export default Login;
