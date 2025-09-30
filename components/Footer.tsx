import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
					<div className="flex flex-col sm:flex-row justify-between items-center gap-6">
						<div>
							<span className="text-xl font-bold tracking-tight">
								Snipe
							</span>
							<p className="text-sm text-muted-foreground mt-1">
								The future of communication
							</p>
						</div>

						<div className="flex items-center gap-8">
							<a
								href="#"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								Terms of Service
							</a>
							<a
								href="#"
								className="text-sm text-muted-foreground hover:text-foreground transition-colors"
							>
								Support
							</a>
						</div>
					</div>

					<div className="border-t mt-8 pt-6 text-center">
						<p className="text-xs text-muted-foreground">
							© 2025 Snipe. This project is a personal portfolio
							piece, created solely for learning, skill
							development, and demonstration purposes. It is not
							affiliated with, nor endorsed by, any mentioned
							brands. Recruiters and employers are warmly invited
							to review this work as part of my job search
							portfolio. For any questions or concerns, please
							feel free to contact me directly.
						</p>
					</div>
				</div>
			</footer>
  )
}
