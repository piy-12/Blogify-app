import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="border border-gray-300 rounded-2xl shadow-md p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">About Blogify</h1>

        <p className="mb-4 text-lg text-gray-700">
          <strong>Blogify</strong> is your space to share ideas, express thoughts, and connect with others through writing.
          Whether you're a passionate writer, a thoughtful reader, or someone exploring creativity — Blogify gives you a
          clean and simple way to publish and discover blogs.
        </p>

        <p className="mb-4 text-lg text-gray-700">
          Built with modern technologies like <strong>React</strong>, <strong>Node.js</strong>, <strong>Express</strong>, and
          <strong> MongoDB</strong>, Blogify is designed to be fast, responsive, and user-friendly.
        </p>

        <div className="mb-4 text-lg text-gray-700">
          Features include:
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Account creation and authentication</li>
            <li>Create and delete your own blogs</li>
            <li>Upload cover images and manage your content</li>
            <li>Comment and interact with other users</li>
          </ul>
        </div>

        <p className="text-lg text-gray-700">
          We believe everyone has a story to tell — start yours today with <strong>Blogify</strong>.
        </p>
      </div>
    </div>
  );
};

export default About;
