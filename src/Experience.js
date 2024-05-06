import React from "react";
import "./Experience.css";

const renderDescription = description => {
  if (Array.isArray(description)) {
    return (
      <ul>
        {description.map((item, index) => (
          <li key={index}>
            {typeof item === "object" ? (
              <>
                {item.text}
                <ul>
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>{subItem}</li>
                  ))}
                </ul>
              </>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
    );
  }
  return <p>{description}</p>;
};

const ExperienceCard = ({ company }) => {
  return (
    <div className="experience-card">
      <h3>{company.companyName}</h3> {/* Display company name */}
      {company.roles.map((role, index) => (
        <div key={index} className="card-item">
          <div className="period">{role.period}</div>
          <h4>{role.title}</h4>
          <div className="descriptions">
            {renderDescription(role.description)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Experience() {
  const experiences = [
    {
      companyName: "Company A",
      roles: [
        {
          title: "Job Title 1",
          period: "Jan 2020 - Dec 2020",
          description: ["Description of your role and achievements."]
        },
        {
          title: "Job Title 2",
          period: "Jan 2021 - Dec 2021",
          description:
            "Description of another role and achievements. Description of another role and achievements."
        }
      ]
    },
    {
      companyName: "Company B",
      roles: [
        {
          title: "Job Title 3",
          period: "Jan 2022 - Present",
          description: "Description of your current role."
        }
      ]
    }
  ];

  return (
    <div className="experience-container">
      <div className="experience">
        {experiences.map((company, index) => (
          <ExperienceCard key={index} company={company} />
        ))}
      </div>
    </div>
  );
}
