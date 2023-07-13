import { FC, PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './Centered.module.scss'

import 'sanitize.css'
import 'sanitize.css/typography.css'

type Props = PropsWithChildren<{}>

const Centered: FC<Props> = ({ children }) => (
  <>
    <html lang="en" className={styles.html}>
      <body className={classNames(styles.body)}>{children}</body>
    </html>
  </>
)

export default Centered
