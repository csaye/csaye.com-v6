import styles from '@/styles/pages/Index.module.scss'
import { Globe } from '@/components/Globe'

export default function Index() {
  return (
    <div className={styles.container}>
      <Globe />
    </div>
  )
}
