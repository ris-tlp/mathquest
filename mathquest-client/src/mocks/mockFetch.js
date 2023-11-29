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

export default async function mockFetch(url){
    switch(url){
        case "http://localhost:3006/api/courses/registered":
        default: {
            return{
                ok: true,
                status: 200,
                json: async () => courseListResponse,
            };
        }
    }
}