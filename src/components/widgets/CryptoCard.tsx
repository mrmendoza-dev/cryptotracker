import { Percent } from "@/components/ui/Percent";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function CryptoCard({ crypto }: { crypto: any }) {
  if (!crypto) return null;

  const isNegativePrice =
    crypto.sparkline_in_7d.price[0] >
    crypto.sparkline_in_7d.price[crypto.sparkline_in_7d.price.length - 1];

  return (
    <div className="w-[225px] p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg cursor-pointer transition-transform duration-150 hover:scale-110">
      <div className="flex flex-col">
        <div className="flex gap-2.5">
          <div className="flex flex-col justify-center items-center">
            <img className="w-10" src={crypto.image} alt={crypto.name} />
            <p className="mt-1 text-lg font-semibold uppercase text-gray-500 dark:text-gray-400">
              {crypto.symbol}
            </p>
          </div>

          <div>
            <p className="text-lg text-gray-900 dark:text-gray-100">
              {crypto.name}
            </p>
            <div className="mt-1.5 ml-1.5">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                $
                {crypto.current_price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
              <Percent value={crypto.price_change_percentage_24h} />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Sparklines data={crypto.sparkline_in_7d.price} margin={0}>
            <SparklinesLine
              color={isNegativePrice ? "#ef4444" : "#10b981"} // text-red-500 : text-emerald-500
              style={{ fill: "none", strokeWidth: 3 }}
            />
          </Sparklines>
        </div>
      </div>
    </div>
  );
}
