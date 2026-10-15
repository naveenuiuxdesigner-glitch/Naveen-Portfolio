import { RouterProvider } from 'react-router/dom'
import { MotionConfig } from 'motion/react'

/*
  The whole site: the router (see routes.jsx) inside the motion settings.
  reducedMotion="user": if a visitor asks their device to reduce motion,
  Motion removes movement and keeps only gentle fades.
*/
export default function App({ router }) {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}
