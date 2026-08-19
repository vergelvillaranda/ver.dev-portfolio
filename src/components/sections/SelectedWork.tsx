'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { projects } from './works/projects.data';
import type { Project } from './works/types';
import ProjectRow from './works/ProjectRow';
import ImageStackViewer from './works/ImageStackViewer';

export default function SelectedWork() {
	const [activeProject, setActiveProject] = useState<Project | null>(null);

	return (
		<section
			id="work"
			data-nav-theme="light"
			className="bg-[var(--paper)] px-6 py-24 md:px-12 md:py-28 lg:px-20"
		>
			<div className="mx-auto w-full max-w-[1700px]">
				<div className="mb-10 flex items-end justify-between border-b border-[var(--border)] pb-8">
					<p className="label-text text-[var(--ink)]">Selected Work</p>
					<p className="label-text text-[var(--muted)]">2023 - 2025</p>
				</div>

				<div className="space-y-16 md:space-y-20 lg:space-y-28">
					{projects.map((project, index) => (
						<ProjectRow
							key={project.name}
							project={project}
							reverse={index % 2 === 1}
							onOpen={setActiveProject}
						/>
					))}
				</div>
			</div>

			<AnimatePresence>
				{activeProject && (
					<ImageStackViewer project={activeProject} onClose={() => setActiveProject(null)} />
				)}
			</AnimatePresence>
		</section>
	);
}	