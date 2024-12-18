import { useState } from "react";

export function ModalCreatePortfolio() {
  const [portfolioName, setPortfolioName] = useState("");

  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Select Coin
        </h2>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Portfolio avatar
          </p>
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">
              {/* You can add an icon here or keep empty for placeholder */}
            </span>
          </div>
        </div>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
          bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
          rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 
          transition-colors duration-200"
        >
          Change
        </button>
      </div>

      {/* Portfolio Form */}
      <form method="dialog" className="flex flex-col gap-6">
        <div className="space-y-2">
          <label
            htmlFor="portfolio-name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Portfolio name
          </label>
          <div className="relative">
            <input
              id="portfolio-name"
              type="text"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              maxLength={24}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-colors"
              placeholder="Enter portfolio name"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {portfolioName.length}/24 characters
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700
            text-white font-semibold py-3 px-4 rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Portfolio
        </button>
      </form>
    </div>
  );
}
