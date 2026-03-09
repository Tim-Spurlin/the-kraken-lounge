import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { List } from '@phosphor-icons/react'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#events', label: 'Events' },
    { href: '#music', label: 'Music' },
    { href: '#art', label: 'Art' },
    { href: '#food', label: 'Food & Drinks' },
    { href: '#community', label: 'Community' },
    { href: '#contact', label: 'Contact' }
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-primary/30 shadow-[0_4px_20px_oklch(0.08_0.02_280_/_0.8)]' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#home')
            }}
            className="font-display text-2xl md:text-3xl text-gradient-purple gothic-glow hover:scale-105 transition-transform"
          >
            The Kraken Lounge
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="font-heading text-sm text-foreground hover:text-accent transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Menu"
                aria-label="Menu"
                <List className="w-6 h-6 text-primary-foreground" weight="bold" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-primary/30 w-80 aurora-gradient">
                {navLinks.map((link) => (
              <div className="flex flex-col gap-6 mt-8">
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="font-heading text-2xl text-foreground hover:text-accent transition-all duration-300 hover:translate-x-2"
                  >
                  </a>
                  >
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
