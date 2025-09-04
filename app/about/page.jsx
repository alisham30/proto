import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const teamMembers = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Project Director",
    department: "Ministry of Tribal Affairs",
    expertise: "Forest Rights Policy & Implementation",
  },
  {
    name: "Priya Sharma",
    role: "Technical Lead",
    department: "National Informatics Centre",
    expertise: "GIS & Remote Sensing",
  },
  {
    name: "Arjun Singh",
    role: "AI/ML Specialist",
    department: "Indian Institute of Technology",
    expertise: "Machine Learning & Computer Vision",
  },
  {
    name: "Dr. Meera Patel",
    role: "Domain Expert",
    department: "Forest Research Institute",
    expertise: "Tribal Rights & Forest Ecology",
  },
]

const technologies = [
  { name: "React.js", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "Leaflet.js", category: "Mapping" },
  { name: "TensorFlow", category: "AI/ML" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Python", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
]

const milestones = [
  { phase: "Phase 1", title: "System Design & Architecture", status: "Completed", date: "Q1 2024" },
  { phase: "Phase 2", title: "Core Platform Development", status: "Completed", date: "Q2 2024" },
  { phase: "Phase 3", title: "AI/ML Integration", status: "In Progress", date: "Q3 2024" },
  { phase: "Phase 4", title: "Pilot Implementation", status: "Planned", date: "Q4 2024" },
  { phase: "Phase 5", title: "Full Deployment", status: "Planned", date: "Q1 2025" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FRA</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">← Back to Home</h1>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">About the Project</h1>
          <p className="text-xl text-gray-600 text-pretty">
            Understanding the Forest Rights Act and our digital transformation initiative
          </p>
        </div>

        <div className="space-y-8">
          {/* Forest Rights Act Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Forest Rights Act Overview</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006,
                commonly known as the Forest Rights Act (FRA), is a landmark legislation that recognizes the rights of
                forest-dwelling tribal communities and other traditional forest dwellers to forest resources. This
                historic act aims to undo the injustice caused to forest-dwelling communities by not recognizing their
                rights over ancestral lands and resources.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                The Act provides a framework for recognizing and vesting forest rights and occupation in forest land in
                forest dwelling Scheduled Tribes and other traditional forest dwellers who have been residing in such
                forests for generations but whose rights could not be recorded.
              </p>
            </CardContent>
          </Card>

          {/* Project Objectives */}
          <Card>
            <CardHeader>
              <CardTitle>Project Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Primary Goals</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Digitize and map FRA claims across target states</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Implement AI-powered asset detection and mapping</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Provide decision support for policy makers</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Secondary Goals</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Enable transparent tracking of FRA implementation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Facilitate data-driven governance</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Improve efficiency of claim processing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Target States */}
          <Card>
            <CardHeader>
              <CardTitle>Target States & Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-lg">Madhya Pradesh</h4>
                  <p className="text-2xl font-bold text-green-600 mt-2">45,230</p>
                  <p className="text-sm text-gray-600">FRA Claims</p>
                  <p className="text-xs text-gray-500 mt-1">52 Districts</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-lg">Odisha</h4>
                  <p className="text-2xl font-bold text-blue-600 mt-2">38,920</p>
                  <p className="text-sm text-gray-600">FRA Claims</p>
                  <p className="text-xs text-gray-500 mt-1">30 Districts</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-lg">Telangana</h4>
                  <p className="text-2xl font-bold text-purple-600 mt-2">28,760</p>
                  <p className="text-sm text-gray-600">FRA Claims</p>
                  <p className="text-xs text-gray-500 mt-1">33 Districts</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-lg">Tripura</h4>
                  <p className="text-2xl font-bold text-orange-600 mt-2">12,450</p>
                  <p className="text-sm text-gray-600">FRA Claims</p>
                  <p className="text-xs text-gray-500 mt-1">8 Districts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold text-lg">{member.name}</h4>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.department}</p>
                    <p className="text-xs text-gray-500 mt-2">{member.expertise}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {tech.name}
                    <span className="ml-2 text-xs text-gray-500">({tech.category})</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline & Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Badge
                        className={
                          milestone.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : milestone.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {milestone.phase}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">{milestone.date}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge
                        variant="outline"
                        className={
                          milestone.status === "Completed"
                            ? "border-green-200 text-green-700"
                            : milestone.status === "In Progress"
                              ? "border-blue-200 text-blue-700"
                              : "border-gray-200 text-gray-700"
                        }
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Future Scope */}
          <Card>
            <CardHeader>
              <CardTitle>Future Scope & Expansion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">Short Term (2024-2025)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Complete pilot implementation in 4 states</li>
                    <li>• Enhance AI accuracy to 95%+</li>
                    <li>• Mobile app for field officers</li>
                    <li>• Real-time monitoring dashboard</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-blue-700">Medium Term (2025-2027)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Expand to 10 additional states</li>
                    <li>• Blockchain for claim verification</li>
                    <li>• Satellite imagery integration</li>
                    <li>• Multilingual support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-purple-700">Long Term (2027+)</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• National FRA implementation</li>
                    <li>• Predictive analytics for policy</li>
                    <li>• Integration with other schemes</li>
                    <li>• International collaboration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Project Office</h4>
                  <div className="space-y-2 text-sm">
                    <p>Ministry of Tribal Affairs</p>
                    <p>Shastri Bhawan, New Delhi - 110001</p>
                    <p>Email: fra.atlas@tribal.gov.in</p>
                    <p>Phone: +91-11-2338-4220</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Technical Support</h4>
                  <div className="space-y-2 text-sm">
                    <p>National Informatics Centre</p>
                    <p>A-Block, CGO Complex, New Delhi</p>
                    <p>Email: support@fra-atlas.gov.in</p>
                    <p>Helpline: 1800-11-3456</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
