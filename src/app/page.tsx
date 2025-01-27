import * as motion from 'motion/react-client';
import { ThemeToggle } from '@/components/global/ThemeToggle';
import { ColorThemeToggle } from '@/components/global/ColorThemeToggle';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-primary text-primary border text-3xl"
    >
      Village App
      <div className="flex gap-2">
        <ColorThemeToggle />
        <ThemeToggle />
      </div>
    </motion.div>
  );
}
