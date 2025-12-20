import { motion } from 'framer-motion'
import { BookmarkIcon } from "lucide-react"
import { Toggle } from "../ui/toggle"

export function ToggleDemo() {
  return (
    <Toggle
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
      className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  )
}

export function Animation() {
  return(
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="  mb-8"
    >
      Blablablablab qmslkdjfmqlkdj
    </motion.div>
  )
}
