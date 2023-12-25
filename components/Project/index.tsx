import Image from 'next/image'
import styles from './styles.module.scss'
import { Project as ProjectType } from '@/utils/projects'
import { motion } from 'framer-motion'

type Props = {
  project: ProjectType
}

export function Project({ project }: Props) {
  const { title, about, image, link, buttons, icons } = project

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.image}>
        <a href={link} target='_blank' rel='noreferrer'>
          <Image
            src={`/img/projects/${image}`}
            layout='fill'
            placeholder='blur'
            blurDataURL={`/img/projects/${image}`}
            style={{ objectFit: 'cover' }}
            alt={image}
          />
        </a>
      </div>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p className={styles.icons}>{icons.join(' • ')}</p>
        <p className={styles.about}>{about}</p>
        <div className={styles.buttons}>
          {buttons.map((button, i) => (
            <div className={styles.button} key={i}>
              <a
                className='wipe button'
                href={button.link}
                target='_blank'
                rel='noreferrer'
              >
                <span>{button.label}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
