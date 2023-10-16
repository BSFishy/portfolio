import { FC, PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './Centered.module.scss'
import { Analytics } from '@vercel/analytics/react'

import 'sanitize.css'
import 'sanitize.css/typography.css'

type Props = PropsWithChildren<{}>

const Centered: FC<Props> = ({ children }) => (
  <>
    <html lang="en" className={styles.html}>
      <body className={classNames(styles.body)}>
        {children}
        <Analytics />
      </body>
    </html>
  </>
)

export default Centered
