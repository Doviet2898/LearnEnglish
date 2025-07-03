
'use client';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Dummy data for demonstration
const courseVideos: Record<string, { title: string; description: string; youtubeId: string }> = {
    '1': {
        title: "Bai 1: Noi gio len",
        description: 'Learn the basics of biology in this introductory course.',
        youtubeId: 'OLbC4mb21PY',
    },
    '2': {
        title: 'Bai 2: Chay khoi the gioi nay',
        description: 'Explore the world of atoms and molecules.',
        youtubeId: '6ZBkDISjv2c',
    },
    '3': {
        title: 'Bai 3: Apollo',
        description: 'Bai hat apollo',
        youtubeId: 'yy5_QFuR0yM',
    }
    // ...add more courses as needed
};

export default function CourseDetails() {
    const params = useParams();
    const id = params?.id as string;
    const course = courseVideos[id] || {
        title: `Course ${id}`,
        description: 'No description available.',
        youtubeId: 'OLbC4mb21PY', // fallback video
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">{course.title}</h1>
                <p className="text-gray-700 mb-6">{course.description}</p>
                <div className="aspect-w-16 aspect-h-9 mb-6">
                    <iframe
                        src={`https://www.youtube.com/embed/${course.youtubeId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-[350px] rounded-lg border"
                    ></iframe>
                </div>
                <Button asChild>
                    <Link href="/courses">Back to Courses</Link>
                </Button>
            </div>
        </div>
    );
}
