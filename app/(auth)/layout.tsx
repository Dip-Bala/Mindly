
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 p-8">
      <div
        className="bg-[radial-gradient(circle_at_top_left,theme(colors.purple.900)_0%,theme(colors.purple.600)_45%,theme(colors.purple.200)_70%,#000_100%)]
  flex items-center justify-center
  px-6
  py-16
  md:py-0
  rounded-4xl"
      >
        <div className="text-white text-center max-w-sm">
          <h1
            className="text-4xl font-bold mb-4 d"
          >
            Memoir
          </h1>
          <p className="text-lg opacity-90 text-gray-50 ">
            Your second brain for the web.
          </p>
        </div>
      </div>

      <div
        className="
        flex items-center justify-center
        px-6
        py-12
        md:py-0
        bg-transparent
      "
      >
        <div
          className="
          w-full max-w-md
          p-6
          md:p-8
          -mt-24
          md:mt-0
        "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
