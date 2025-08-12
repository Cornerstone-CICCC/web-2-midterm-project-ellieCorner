import { memo } from "react";

export const Loading = memo(() => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
    <div className="text-center relative">
      <div className="absolute inset-0 -m-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mb-8">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 border-4 border-purple-400/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-400 rounded-full animate-spin"></div>
          <div
            className="absolute inset-2 border-4 border-transparent border-t-pink-400 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-4 animate-bounce">
              <div className="text-3xl animate-pulse">🎬</div>
            </div>
          </div>

          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-spin"
                style={{
                  transformOrigin: "50px 50px",
                  animation: `spin 3s linear infinite`,
                  animationDelay: `${i * 1}s`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-6px",
                  marginTop: "-50px",
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="overflow-hidden">
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
            🌟 CinemaVerse 🌟
          </p>
        </div>

        <div className="h-8 flex items-center justify-center">
          <p className="text-purple-300 text-xl font-medium">
            {"영화의 🚀 우주를 ✨ 탐험하는 중...".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </p>
        </div>

        <div className="w-64 mx-auto">
          <div className="bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 h-full rounded-full animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));
