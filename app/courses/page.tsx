'use client'
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function Courses() {
    const courses = [
        {
            id: 1,
            title: "Nghe bai hat Noi gio len",
            description: "A comprehensive course designed to take you from beginner to IELTS proficiency.",
        },
        {
            id: 2,
            title: "Nghe bai hat Chay khoi the gioi nay",
            description: "Deep dive into modern JavaScript features and best practices.",
        },
        {
            id: 3,
            title: "Nghe bai hat Apollo",
            description: "Learn the fundamentals of React and build interactive UIs.",
        },
        {
            id: 4,
            title: "Data Science with Python",
            description: "An introduction to data science concepts using Python.",
        },
        {
            id: 5,
            title: "Web Development Bootcamp",
            description: "Full-stack web development from HTML to deployment.",
        },
        {
            id: 6,
            title: "Machine Learning Basics",
            description: "Get started with machine learning algorithms and applications.",
        },
        {
            id: 7,
            title: "UI/UX Design Principles",
            description: "Learn the key principles of user interface and user experience design.",
        },
        {
            id: 8,
            title: "Cloud Computing Essentials",
            description: "Understand cloud computing concepts and services.",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            <span className="text-2xl font-bold text-gray-900">StudyMaster</span>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <Link href="/sets" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Study Sets
                            </Link>
                            <Link href="/create" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Create
                            </Link>
                            <Link href="/progress" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Progress
                            </Link>
                            <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">
                                Courses
                            </Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Link href="/login">
                                <Button variant="ghost">Log in</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Sign up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">{course.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                            </div>
                            <Button asChild>
                                <Link href={`/courses/${course.id}`}>View Course</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}