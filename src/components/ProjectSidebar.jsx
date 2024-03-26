import Button from "./Button";
export default function ProjectSidebar({
  onStart,
  projects,
  handleSelect,
  projectId,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className=" mb-8 font-bold uppercase md:text-xl text-stone-50 ">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStart}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects.map((item) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

          if (projectId === item.id) {
            cssClasses += " text-stone-200 bg-stone-800";
          } else {
            cssClasses += " text-stone-400";
          }

          return (
            <li key={item.id}>
              <button
                onClick={() => handleSelect(item.id)}
                className={cssClasses}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
