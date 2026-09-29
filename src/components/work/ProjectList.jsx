import { ProjectCard } from './ProjectCard'
import styles from './ProjectList.module.css'

/*
  The Work grid, in the order set in src/data/projects.js.
  An editorial rhythm: one wide card, then two side by side, and again.
*/
export function ProjectList({ projects }) {
  return (
    <div className={styles.grid}>
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} featured={index % 3 === 0} />
      ))}
    </div>
  )
}
