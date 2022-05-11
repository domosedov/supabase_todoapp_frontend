import * as React from "react";
import type { AppProps } from "next/app";
import { Provider as EffectorProvider } from "effector-react/scope";
import { useScope } from "~/scope";
import { AppWrapper } from "~/app/wrapper";
import { AppLayout } from "~/layout";
import "~/styles/globals.css";

const Application = ({ Component, pageProps }: AppProps) => {
  const scope = useScope(pageProps.initialState);
  return (
    <EffectorProvider value={scope}>
      <AppWrapper>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AppWrapper>
    </EffectorProvider>
  );
};

export default Application;
