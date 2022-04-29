import * as React from "react";
import Link from "next/link";
import type { AppProps } from "next/app";
import { reflect } from "@effector/reflect/ssr";
import {
  Provider as EffectorProvider,
  useEvent,
  useStore,
  useGate,
} from "effector-react/scope";
import "~/styles/globals.css";
import { useScope } from "~/scope";
import { authModel } from "~/entities/auth";
import { appModel } from "~/app";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signOut = useEvent(authModel.signOut);
  const isLoggedIn = useStore(authModel.$isLoggedIn);
  console.log({ isLoggedIn });

  useGate(appModel.AppGate);

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
            <Link href={`/counter`}>
              <a className="bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded">
                Counter
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
            <button
              type="button"
              onClick={signOut}
              className="bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded"
            >
              Выйти
            </button>
            {isLoggedIn ? <div>Залогинен</div> : <div>Незалогинен</div>}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

const LayoutView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signOut = useEvent(authModel.signOut);
  const isLoggedIn = useStore(authModel.$isLoggedIn);
  console.log({ isLoggedIn });

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
            <Link href={`/counter`}>
              <a className="bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded">
                Counter
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
            <button
              type="button"
              onClick={signOut}
              className="bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded"
            >
              Выйти
            </button>
            {isLoggedIn ? <div>Залогинен</div> : <div>Незалогинен</div>}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

const LayoutWithEffect: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const signOut = useEvent(authModel.signOut);
  const isLoggedIn = useStore(authModel.$isLoggedIn);
  const [mount, unmount] = useEvent([
    appModel.appMounted,
    appModel.appUnmounted,
  ]);

  React.useEffect(() => {
    mount();
    return () => {
      unmount();
    };
  }, [mount, unmount]);

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
            <Link href={`/counter`}>
              <a className="bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded">
                Counter
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
            <button
              type="button"
              onClick={signOut}
              className="bg-green-500 text-white uppercase text-sm font-semibold px-3 py-1 duration-200 hover:bg-green-600 rounded"
            >
              Выйти
            </button>
            {isLoggedIn ? <div>Залогинен</div> : <div>Незалогинен</div>}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

const ReflectedLayout = reflect({
  view: LayoutView,
  bind: {},
  hooks: {
    mounted: authModel.watchAuthStateChanges,
    unmounted: authModel.unwatchAuthStateChanges,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const scope = useScope(pageProps.initialState);
  return (
    <EffectorProvider value={scope}>
      <LayoutWithEffect>
        <Component {...pageProps} />
      </LayoutWithEffect>
    </EffectorProvider>
  );
}

export default MyApp;
