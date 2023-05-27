import { Heading, Box, Text, Button } from "grommet";
import "./LinkPage.css";
import { Linkedin } from "grommet-icons";
import {
  FaTwitterSquare,
  FaFacebookSquare,
  FaLinkedin,
  FaYoutubeSquare,
  FaRssSquare,
} from "react-icons/fa";

const companyColumn = [
  {
    label: " About HPE",
    hyperlink: "https://www.hpe.com/emea_europe/en/about.html",
  },
  {
    label: "Accessibility",
    hyperlink: "https://www.hpe.com/emea_europe/en/about/AEM.html",
  },
  { label: "Careers", hyperlink: "https://careers.hpe.com/us/en" },
  {
    label: "Contact Us",
    hyperlink: "https://www.hpe.com/uk/en/contact-hpe.html",
  },
  {
    label: "Corporate Responsibility",
    hyperlink: "https://www.hpe.com/us/en/living-progress.html",
  },
  {
    label: "Global Diversity & Inclusion",
    hyperlink: "https://www.hpe.com/us/en/about/diversity.html",
  },
  {
    label: "HPE Modern Slavery Transperancy Statement (PDF)",
    hyperlink: "google.co.in",
  },
  {
    label: "Hawlett Packard Labs",
    hyperlink: "https://www.hpe.com/us/en/hewlett-packard-labs.html",
  },
  { label: "investor Relations", hyperlink: "https://investors.hpe.com/" },
  {
    label: "Leadership",
    hyperlink: "https://www.hpe.com/emea_europe/en/leadership.html",
  },
  {
    label: "Public Policy",
    hyperlink: "https://www.hpe.com/us/en/living-progress/report.html",
  },
];

const learnAboutColumn = [
  {
    label: " Artificial intelligence",
    hyperlink:
      "https://www.hpe.com/emea_europe/en/what-is/artificial-intelligence.html",
  },
  {
    label: "Cloud Computing",
    hyperlink:
      "https://www.hpe.com/emea_europe/en/what-is/cloud-computing.html",
  },
  {
    label: "Containers",
    hyperlink: "https://www.hpe.com/emea_europe/en/what-is/containers.html",
  },
  {
    label: "Machine Learning",
    hyperlink:
      "https://www.hpe.com/emea_europe/en/what-is/machine-learning.html",
  },
  {
    label: "Enterprise Glossary",
    hyperlink: "https://www.hpe.com/emea_europe/en/what-is.html",
  },
];

const newsAndEventsColumn = [
  { label: "NewsRoom", hyperlink: "https://www.hpe.com/us/en/newsroom.html" },
  {
    label: "HPE Discover",
    hyperlink: "https://www.hpe.com/us/en/discover.html",
  },
  {
    label: "events",
    hyperlink: "https://www.hpe.com/us/en/discover-more-network/events.html",
  },
];

const partnersColumn = [
  {
    label: "Partner Programmes",
    hyperlink: "https://www.hpe.com/emea_europe/en/solutions/partners.html",
  },
  {
    label: "Find a Partner",
    hyperlink: "https://partnerconnect.hpe.com/partners",
  },
  {
    label: "Certifications",
    hyperlink: "https://certification-learning.hpe.com/TR/Index.html",
  },
  {
    label: "Ezmeral MarketPlace",
    hyperlink: "https://www.hpe.com/us/en/software/marketplace.html",
  },
];

const supportColumn = [
  {
    label: "Product Support",
    hyperlink: "https://support.hpe.com/connect/s/?language=en_US",
  },
  {
    label: "Software & Drivers",
    hyperlink: "https://myenterpriselicense.hpe.com/cwp-ui/software",
  },
  {
    label: "Warranty Check",
    hyperlink:
      "https://auth.hpe.com/hpe/cf/?fromURI=%252Foauth2%252Fv1%252Fauthorize%252Fredirect%253Fokta_key%253DPakYOZov8I3MoYgdMcnwCtO6PNtEEC6bO-55-nlQGbU",
  },
  {
    label: "Enhanced Support Services",
    hyperlink: "https://www.hpe.com/emea_europe/en/services/operational.html",
  },
  {
    label: "Education and Training",
    hyperlink: "https://education.hpe.com/us/en/training/index.html",
  },
  {
    label: "Product Return and Recycling",
    hyperlink:
      "https://www.hpe.com/emea_europe/en/about/environment/product-recycling.html",
  },
];

const communitiesColumn = [
  { label: "HPE Community", hyperlink: "https://community.hpe.com/" },
  {
    label: "Aruba Airheads",
    hyperlink: "https://community.arubanetworks.com/home",
  },
  {
    label: "HPE Tech Pro Community",
    hyperlink: "https://techpro.hpe.com/hpelogin.aspx",
  },
  { label: "HPE Developer Community", hyperlink: "https://developer.hpe.com/" },
  {
    label: "All Blogs and Forums",
    hyperlink: "https://www.hpe.com/emea_europe/en/communities.html",
  },
];

const customerResourceColumn = [
  {
    label: "Customer Stories",
    hyperlink: "https://www.hpe.com/us/en/customer-case-studies.html",
  },
  {
    label: "How to Buy",
    hyperlink: "https://www.hpe.com/emea_europe/en/buy-parts-products.html",
  },
  {
    label: "Financial Services",
    hyperlink:
      "https://www.hpe.com/emea_europe/en/services/financial-services.html",
  },
  {
    label: "Executive Briefing Centre",
    hyperlink: "https://www.hpe.com/emea_europe/en/about/customer-centers.html",
  },
  {
    label: "Email Signup",
    hyperlink: "https://h41360.www4.hpe.com/?country=US&language=US",
  },
  {
    label: "HPE MyAccount",
    hyperlink:
      "https://auth.hpe.com/hpe/cf/?fromURI=%252Foauth2%252Fv1%252Fauthorize%252Fredirect%253Fokta_key%253D-NQTSahvk9UoVgUOEBy4va-kmnJZ5j7Mkhw6W8YTvGA",
  },
  {
    label: "Resource Library",
    hyperlink: "https://www.hpe.com/emea_europe/en/resource-library.html",
  },
  {
    label: "Video Gallery",
    hyperlink: "https://www.hpe.com/h22228/video-gallery/",
  },
  {
    label: "Voice of the Customer Signup",
    hyperlink:
      "https://hpetraining.co1.qualtrics.com/jfe/form/SV_5AviM619Y0X72NE",
  },
];

const LinksPage = () => {
  return (
    <Box fill direction="row-responsive" margin={{ top: "large", left: "large" }}>
      <Box fill class="hpehf-links-container" className="LinkPage" gap="xsmall">
        <Text weight="bold"> COMPANY</Text>
        {companyColumn.map((link) => {
          return (
            <a
              class="hpehf-link"
              key={link.label}
              href={link.hyperlink}
              id={link.label}
            >
              {link.label}
            </a>
          );
        })}
      </Box>

      <Box fill class="hpehf-links-container" className="LinkPage" gap="xsmall">
        <Text level={4} weight="bold">
          LEARN ABOUT
        </Text>
        {learnAboutColumn.map((link) => {
          return (
            <a
              class="hpehf-link"
              key={link.label}
              href={link.hyperlink}
              id={link.label}
            >
              {link.label}
            </a>
          );
        })}
        <Text level={4} weight="bold" margin={{ top: "40px" }}>
          NEWS AND EVENTS
        </Text>
        {newsAndEventsColumn.map((link) => {
          return (
            <a
              class="hpehf-link"
              key={link.label}
              href={link.hyperlink}
              id={link.label}
            >
              {link.label}
            </a>
          );
        })}

        <Text level={4} weight="bold" margin={{ top: "40px" }}>
          PARTNERS
        </Text>
        {partnersColumn.map((link) => {
          return (
            <a
              class="hpehf-link"
              key={link.label}
              href={link.hyperlink}
              id={link.label}
            >
              {link.label}
            </a>
          );
        })}
      </Box>

      <Box fill class="hpehf-links-container" className="LinkPage" gap="xsmall">
        <Text weight="bold"> SUPPORT</Text>
        {supportColumn.map((link) => {
          return (
            <a
              class="hpehf-link"
              key={link.label}
              href={link.hyperlink}
              id={link.label}
            >
              {link.label}
            </a>
          );
        })}
        <Text weight="bold" margin={{ top: "40px" }}>
          COMMUNITIES
        </Text>
        {communitiesColumn.map((link) => {
          return (
            <a
              class="hpehf-link"
              key={link.label}
              href={link.hyperlink}
              id={link.label}
            >
              {link.label}
            </a>
          );
        })}
      </Box>

      <Box fill class="hpehf-links-container" className="LinkPage" gap="xsmall">
        <Text weight="bold"> CUSTOMER RESOURCES</Text>
        {customerResourceColumn.map((link) => {
          return (
            <a
              class="hpehf-link"
              key={link.label}
              href={link.hyperlink}
              id={link.label}
            >
              {link.label}
            </a>
          );
        })}
      </Box>

      <Box fill class="hpehf-links-container" className="LinkPage" gap="xsmall">
        <Text weight="bold"> FOLLOW HPE</Text>
        <Box direction="row">
          <a
            href="https://www.linkedin.com/companyColumn/hewlett-packard-enterprise"
            target="_blank"
          >
            <FaLinkedin color="#01a982" size={30} />
          </a>

          <a href="https://twitter.com/hpe" target="_blank">
            <FaTwitterSquare color="#01a982" size={30} />
          </a>

          <a
            href="https://www.facebook.com/HewlettPackardEnterprise/"
            target="_blank"
          >
            <FaFacebookSquare color="#01a982" size={30} />
          </a>

          <a href="https://www.youtube.com/hpe" target="_blank">
            <FaYoutubeSquare color="#01a982" size={30} />
          </a>

          <a href="https://twitter.com/hpe" target="_blank">
            <FaRssSquare color="01a982" size={30} />
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default LinksPage;
