export default function Hero() {
  return (
    <div className="flex flex-col items-center w-full gap-12 px-32 pt-16 pb-64 bg-white">
      <a href="#">
        <img src="/header.svg" width={500} height={100} />
      </a>
      <p className="text-2xl text-center text-gray-600">
        Start your workday by creating a schedule
        <br />
        and press start to get going.
      </p>
    </div>
  );
}
