import React from 'react';

const ResearchPaper = () => {
    const researchPapers = [
        {
            title: "Research Paper 1",
            link: "https://example.com/research-paper-1",
        },
        {
            title: "Research Paper 2",
            link: "https://example.com/research-paper-2",
        },
        // Add more research papers here
        // ...
    ];

    return (
        <section className="max-w-3xl mx-auto my-8 p-4">
            <h2 className="text-2xl font-bold mb-4">Recommended Research Papers</h2>
            <ul className="list-disc list-inside">
                {researchPapers.map((paper, index) => (
                    <li key={index} className="mb-2">
                        <a
                            href={paper.link}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {paper.title}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ResearchPaper;
