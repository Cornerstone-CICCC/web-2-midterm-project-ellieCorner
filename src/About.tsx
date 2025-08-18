import { Heart, Code, Users, GitGraphIcon, User } from "lucide-react";

export const About = () => (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 dark:from-gray-900 dark:to-gray-800 dark:text-white p-4 md:p-12">
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About This Project
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
          Discover movies, explore ratings, and manage your favorites
          seamlessly.
        </p>
      </header>

      <section className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-md dark:shadow-none p-6 md:p-10 space-y-4">
        <h2 className="text-2xl font-semibold flex items-center space-x-2">
          <Code className="h-6 w-6 text-purple-500 dark:text-purple-400" />
          <span>Mission</span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This platform aims to provide a smooth, visually appealing way to
          browse and manage movie information. Built with modern web
          technologies, it focuses on user experience, responsiveness, and
          aesthetic design.
        </p>
      </section>

      <section className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-md dark:shadow-none p-6 md:p-10 space-y-6">
        <h2 className="text-2xl font-semibold flex items-center space-x-2">
          <Users className="h-6 w-6 text-green-500 dark:text-green-400" />
          <span>Developer</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[{ name: "Ellie", role: "Frontend" }].map((member) => (
            <div
              key={member.name}
              className="bg-gray-100 dark:bg-white/10 rounded-xl p-4 flex flex-col items-center transition-transform hover:scale-105"
            >
              <User className="h-16 w-16 text-purple-600 dark:text-purple-500 mb-4" />
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl shadow-md dark:shadow-none p-6 md:p-10 space-y-4">
        <h2 className="text-2xl font-semibold flex items-center space-x-2">
          <Heart className="h-6 w-6 text-red-500 dark:text-red-400" />
          <span>Special Thanks</span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I would like to thank the open-source community and APIs like TMDB for
          providing movie data, making this project possible.
        </p>
      </section>

      <section className="text-center">
        <a
          href="https://github.com/Cornerstone-CICCC/web-2-midterm-project-ellieCorner"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white px-6 py-3 rounded-full transition-all hover:scale-105 font-semibold"
        >
          <GitGraphIcon className="h-5 w-5" />
          <span>View on GitHub</span>
        </a>
      </section>
    </div>
  </div>
);
