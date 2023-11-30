// Mock response data for a course list
const courseListResponse = {
    message: {
        _id: 123,
        courseName: "name",
        isPublished: true,
        courseInstructor: 'instructor',
        courseDuration: '30 hours',
        courseDescription: "description",
        overview: 'overview',
    },
};

// Mocking a fetch function for testing purposes
export default async function mockFetch(url){
    // Switch statement to handle different URLs, currently only handling one URL
    switch(url){
        case "http://localhost:3006/api/courses/registered":
        default: {
            return{
                ok: true,
                status: 200,
                // Simulate converting the response to JSON
                json: async () => courseListResponse,
            };
        }
    }
}