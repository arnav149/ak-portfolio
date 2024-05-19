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
                <ul className="unfilled-bullet">
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
      companyName: "Intuit Credit Karma",
      roles: [
        {
          title: "Software Engineer 3",
          period: "Dec 2022 - Present",
          description: [
            {
              text:
                "Led the design, implementation, testing and deployment of a new service intended to be used internally for serving test user data",
              subItems: [
                "Implemented a REST API according to company standards which mocked partner APIs involved in user registration",
                "Published test user artifacts to GCS buckets using a CircleCI pipeline which reduced the time for new data to be available in prod by 75%",
                "Deprecated three legacy services and migrated existing workflows to the new one, resulting in a 67% reduction in maintenance overhead"
              ]
            },
            {
              text:
                "Contributed in migrating to a new partner API which involved accommodating for changes in underlying data, changes in credit report format and being able to ingest thousands of additional credit attributes",
              subItems: [
                "Helped with setting up dual reads from both existing and new partner APIs in the early stages of migration",
                "Modified credit report pull eligibility logic to select members for dual read to maximize revenue while working within the contract",
                "Wrote smoke tests for testing the dual read workflow and comprehensive unit tests for testing the new eligibility logic"
              ]
            },
            "Acted as the point of contact for a major stakeholder and led development initiatives to help them ramp a critical experiment involving member registration"
          ]
        },
        {
          title: "Software Engineer 2",
          period: "Jan 2022 - Dec 2022",
          description: [
            "Authored comprehensive design document for a project intended to reduce member login latency and improve product recommendations",
            "Actively contributed to the company-wide adoption of changes by working on streamlining of the deployment process and migrating monitoring dashboards/alerts",
            "Handled edge cases in member enrollments in order to have a robust enrollments architecture"
          ]
        },
        {
          title: "Software Engineering Intern",
          period: "May 2021 - Aug 2021",
          description: [
            "Familiarized myself with the company’s internal Scala framework by spinning up two new components in the data ingestion service",
            "Set up service bus consumers in both the components, responsible for ingesting modeling data and CCPA deletion messages respectively",
            "Worked with the Database Engineering team to create a sharded table and developed a MySQL database client to handle 2500+ reads and writes per second",
            "Utilized the database client along with an existing BigTable client to handle CCPA deletion messages"
          ]
        }
      ]
    },
    {
      companyName: "ASU College of Liberal Arts and Sciences",
      roles: [
        {
          title: "Web Developer",
          period: "Aug 2021 - Dec 2021",
          description: [
            "Used ASU Drupal Distribution to migrate 50+ web pages to a newer version of Drupal technology",
            "Contributed to the React based web pages including but not limited to creating a table view for ASU News React component"
          ]
        }
      ]
    },
    {
      companyName: "Ira A. Fulton Schools of Engineering at ASU",
      roles: [
        {
          title: "Peer Career Coach",
          period: "Aug 2019 - Aug 2020",
          description: [
            "Provided STEM students with professional development and job search techniques",
            "Hosted webinars on a variety of topics and contributed to blogposts on ASU’s Inner Circle"
          ]
        },
        {
          title: "Undergraduate Teaching Assistant",
          period: "Aug 2019 - Dec 2019",
          description: [
            "Assisted freshman engineering students with projects, including an automated maze-solving car"
          ]
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
