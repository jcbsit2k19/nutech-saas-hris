import Card from "@components/containers/card";

export default function StatusCard({
  title,
  value,
  subtext,
  icon: Icon,
  iconColor = "indigo", // Default color
  loading,
}) {
  const colorMap = {
    indigo: "text-indigo-500",
    blue: "text-blue-500",
    green: "text-emerald-500",
    yellow: "text-amber-500",
    red: "text-rose-500",
    gray: "text-slate-500",
  };

  const selectedColor = colorMap[iconColor] || colorMap.indigo;

  return (
    <Card className="h-full flex flex-col justify-center items-center relative overflow-hidden">
      {loading ? (
        <div
          className={`animate-pulse h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded`}
        ></div>
      ) : (
        <>
          <Icon
            className={`absolute -right-4 -bottom-4 w-24 h-24 opacity-10 ${selectedColor}`}
          />

          <p className="opacity-80 text-sm font-medium relative z-10 text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h2 className="text-3xl font-bold my-1 relative z-10 text-slate-800 dark:text-slate-100">
            {value}
          </h2>
          {subtext && (
            <p className="text-xs opacity-70 relative z-10 text-slate-500 dark:text-slate-400">
              {subtext}
            </p>
          )}
        </>
      )}
    </Card>
  );
}
