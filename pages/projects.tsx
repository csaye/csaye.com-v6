import { projects } from '@/utils/projects'
import { Project } from '@/components/Project'
import styles from '@/styles/pages/projects.module.scss'
import Link from 'next/link'

export default function Projects() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href='/' className='link'>
          &larr; Return to homepage
        </Link>
      </div>
      <div className={styles.content}>
        <h1>Projects</h1>
        <p>Assorted apps, games, & experiments I’ve built over the years.</p>
        <div className={styles.projectsWrapper}>
          <div className={styles.projects}>
            {projects.map((project, i) => (
              <Project project={project} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
