import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Composant qui anime ses enfants avec un effet de "fade-in"
 * lorsqu'ils deviennent visibles à l'écran.
 */
const FadeInSection = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default FadeInSection;