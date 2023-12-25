import { projects } from '@/utils/projects'
import { Project } from '@/components/Project'
import styles from '@/styles/pages/projects.module.scss'

export default function Projects() {
  return (
    <div className={styles.container}>
      <h1>Projects</h1>
      <p>Assorted apps, experiments, and games I’ve built over the years.</p>
      <div className={styles.projectsWrapper}>
        <div className={styles.projects}>
          {projects.map((project, i) => (
            <Project project={project} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
