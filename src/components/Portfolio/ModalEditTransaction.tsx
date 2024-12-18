
export function ModalEditTransaction({
  cryptoId,
  deletePortfolioTransactions,
}: any) {
  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Remove this coin
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          All transactions associated with this coin will be removed.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          onClick={() => deletePortfolioTransactions(cryptoId)}
          className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 
            text-white font-semibold py-3 px-4 rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Remove
        </button>
        <button
          className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
            dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 
            font-semibold py-3 px-4 rounded-lg transition-colors
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
