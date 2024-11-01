"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiEdit3,
  FiClock,
  FiUsers,
  FiCheck,
  FiStar,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BurgerMenu from "@/components/BurgerMenu";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const AnimateOnScroll = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const DotPattern = () => (
  <svg className="absolute inset-0 -z-10 h-full w-full stroke-gray-400 dark:stroke-gray-600 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
    <defs>
      <pattern
        id="dotPattern"
        width="30"
        height="30"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="1" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" strokeWidth="0" fill="url(#dotPattern)" />
  </svg>
);

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoaded && userId) {
      router.push("/dashboard");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || userId) {
    return null;
  }

  const handleStartClick = () => {
    if (user) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <DotPattern />
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <motion.a
          className="flex items-center justify-center"
          href="#"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-bold text-2xl">NoteFlow</span>
        </motion.a>
        <motion.nav
          className="hidden md:flex items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Fonctionnalités
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Tarifs
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </a>
          <ThemeToggle />
        </motion.nav>
        <BurgerMenu />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <TypeAnimation
                  sequence={[
                    "Bienvenue sur NoteFlow",
                    1500,
                    "Bienvenue sur votre espace de travail",
                    1500,
                    "Bienvenue sur votre plateforme collaborative",
                    1500,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Votre plateforme de prise de notes collaborative en temps réel
              </motion.p>
              <motion.div
                className="space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <SignInButton mode="modal">
                  <Button>Commencer</Button>
                </SignInButton>
                <Button variant="outline">En savoir plus</Button>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-2xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Fonctionnalités principales
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FiEdit3 className="text-4xl mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Édition en temps réel
                </h3>
                <p>Collaborez sur vos notes en temps réel avec votre équipe.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <FiClock className="text-4xl mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Historique des versions
                </h3>
                <p>Accédez à l&apos;historique complet de vos modifications.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FiUsers className="text-4xl mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Collaboration d&apos;équipe
                </h3>
                <p>Partagez et collaborez facilement avec votre équipe.</p>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 ">
          <div className="container px-4 md:px-6">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Nos tarifs
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Gratuit",
                  price: "0€",
                  features: [
                    "1 utilisateur",
                    "20 notes",
                    "Édition en temps réel",
                    "Application web",
                    "Exportation en PDF",
                    "Support par email",
                  ],
                },
                {
                  title: "Basic",
                  price: "4.99€",
                  features: [
                    "Jusqu'à 5 utilisateurs",
                    "100 notes",
                    "Édition en temps réel",
                    "Applications web et mobile",
                    "Exportation en PDF et Word",
                    "Historique des versions (30 jours)",
                    "Support par chat",
                  ],
                  mostPopular: true,
                },
                {
                  title: "Premium",
                  price: "9.99€",
                  features: [
                    "Utilisateurs illimités",
                    "Notes illimitées",
                    "Édition en temps réel",
                    "Applications web, mobile et desktop",
                    "Exportation en PDF, Word, et Markdown",
                    "Historique des versions illimité",
                    "Intégration avec Google Drive et Dropbox",
                    "Support prioritaire 24/7",
                    "Personnalisation avancée",
                    "Fonctionnalités de collaboration avancées",
                  ],
                },
              ].map((plan, index) => (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative group pt-6"
                >
                  {plan.mostPopular && (
                    <div className="absolute -top-3 left-0 right-0 text-center z-10">
                      <span className="bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full inline-flex items-center">
                        <FiStar className="mr-1" /> Le plus populaire
                      </span>
                    </div>
                  )}
                  <Card
                    className={`h-full transition-all duration-300 ${
                      plan.mostPopular
                        ? "shadow-lg group-hover:shadow-xl group-hover:-translate-y-2 z-0"
                        : "group-hover:shadow-md group-hover:-translate-y-1"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle>{plan.title}</CardTitle>
                      <CardDescription>
                        <span className="text-3xl font-bold">{plan.price}</span>
                        {plan.price !== "0€" && (
                          <span className="text-xl">/mois</span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <FiCheck className="mr-2 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        {plan.title === "Gratuit"
                          ? "Commencer gratuitement"
                          : "Essai gratuit de 14 jours"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <AnimateOnScroll>
              <h2 className="text-3xl font-bold text-center mb-12">
                Contactez-nous
              </h2>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimateOnScroll>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Envoyez-nous un message
                  </h3>
                  <form className="space-y-4">
                    <Input type="text" placeholder="Votre nom" />
                    <Input type="email" placeholder="Votre email" />
                    <Textarea placeholder="Votre message" rows={4} />
                    <Button type="submit" className="w-full">
                      Envoyer
                    </Button>
                  </form>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">
                    Nos coordonnées
                  </h3>
                  <div className="flex items-center space-x-2">
                    <FiMail className="text-primary" />
                    <span>contact@noteflow.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiPhone className="text-primary" />
                    <span>+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiMapPin className="text-primary" />
                    <span>
                      123 Rue de la Collaboration, 75000 Paris, France
                    </span>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      </main>
      <motion.footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 NoteFlow. Tous droits réservés.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Conditions d&apos;utilisation
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Politique de confidentialité
          </a>
        </nav>
      </motion.footer>
    </div>
  );
}
