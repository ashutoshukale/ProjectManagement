import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import ProjectSidebar from "./components/ProjectSidebar";
import { useState } from "react";
import SelectProject from "./components/SelectedProject";
function App() {
  const [projectState, setProjectState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: [],
  });

  function addTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProject,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function deleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => {
          return task.id !== id;
        }),
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancel() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
      };
    });
  }

  function handleSelect(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: id,
      };
    });
  }

  function handleDelete() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter((project) => {
          return project.id !== prevState.selectedProject;
        }),
      };
    });
    console.log(projectState);
  }

  // console.log(projectState);
  const selectProjectId = projectState.projects.find(
    (project) => project.id === projectState.selectedProject
  );

  let content = (
    <SelectProject
      project={selectProjectId}
      handleDelete={handleDelete}
      onAddTask={addTask}
      onDeleteTask={deleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProject === null) {
    content = (
      <NewProject onAdd={handleAddProject} handleCancel={handleCancel} />
    );
  } else if (projectState.selectedProject === undefined) {
    content = <NoProject onStart={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSidebar
        handleSelect={handleSelect}
        onStart={handleStartAddProject}
        projects={projectState.projects}
        projectId={projectState.selectedProject}
      />
      {content}
    </main>
  );
}

export default App;
