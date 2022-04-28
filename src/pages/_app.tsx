import * as React from "react";
import Link from "next/link";
import type { AppProps } from "next/app";
import { Provider as EffectorProvider } from "effector-react/scope";
import "~/styles/globals.css";
import { useScope } from "~/scope";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <header className="bg-green-400 sticky top-0">
        <div className="px-4 py-2">
          <nav className="flex items-center gap-4">
            <Link href={`/`}>
              <a className="bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded">
                Home
              </a>
            </Link>
            <Link href={`/signup`}>
              <a className="bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded">
                Регистрация
              </a>
            </Link>
            <Link href={`/signin`}>
              <a className="bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded">
                Войти
              </a>
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  const scope = useScope(pageProps.initialState);
  return (
    <EffectorProvider value={scope}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </EffectorProvider>
  );
}

export default MyApp;
