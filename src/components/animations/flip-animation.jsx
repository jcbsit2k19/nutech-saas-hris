import React from "react";

export default function FlipCard() {
  // State to manage the flipped status of the card
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-sans">
      <div
        // This is the container that provides the 3D perspective.
        // The value of `perspective` determines the "depth" of the 3D effect.
        className="group w-72 h-96 perspective-[1000px]"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        {/* This is the inner container that actually flips. */}
        {/* It has a transition and will rotate based on the `isFlipped` state. */}
        <div
          className={`relative w-full h-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
            isFlipped ? "transform-[rotateY(180deg)]" : ""
          }`}
        >
          {/* Front Face of the Card */}
          <div className="absolute inset-0 backface-hidden">
            <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex flex-col items-center justify-center text-white p-6">
              <div className="w-24 h-24 mb-4 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mouse-pointer-2"
                >
                  <path d="m4 4 7.07 17 2.51-7.39L21 11.07z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Hover Me!</h2>
              <p className="text-center text-sm opacity-80">
                This is the front face of the card. Move your mouse over this
                area to see the flip effect.
              </p>
            </div>
          </div>

          {/* Back Face of the Card */}
          {/* It's initially rotated 180 degrees to be hidden. */}
          <div className="absolute inset-0 transform-[rotateY(180deg)] backface-hidden">
            <div className="w-full h-full bg-linear-to-br from-gray-700 to-gray-800 rounded-xl flex flex-col items-center justify-center text-white p-6">
              <div className="w-24 h-24 mb-4 rounded-full bg-black bg-opacity-20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-rotate-cw"
                >
                  <path d="M21 2v6h-6" />
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M3 22v-6h6" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Flipped!</h2>
              <p className="text-center text-sm opacity-80">
                This is the back face. You can put any content you want here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
