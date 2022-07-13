import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { HomeIcon, PencilAltIcon } from "@heroicons/react/solid";
import { Hero, Schedule, Footer } from "./components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pomo:do:ro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center min-h-screen gap-16 text-gray-800">
        <Hero />
        <Schedule />
        <Footer />
      </div>
    </>
  );
};

export default Home;
