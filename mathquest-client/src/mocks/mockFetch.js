// Mock response data for a course list
const courseListResponse = {
    message: 
       [ {_id: 123,
        courseName: "name",
        isPublished: true,
        courseInstructor: 'instructor',
        courseDuration: '30 hours',
        courseDescription: "description",
        overview: 'overview',
       }
       ]
    
};

const course = {
    message:{
        _id: 123,
        courseName: "name",
        isPublished: true,
        courseInstructor: 'instructor',
        courseDuration: '30 hours',
        courseDescription: "description",
        overview: 'overview',
    },
};

const signupResponse = {
    message:{
        name: 'name',
        email:'email',
        userType: 'student'
    },
};

export default async function mockFetch(url){
    // Switch statement to handle different URLs, currently only handling one URL
    switch(url){
        case "http://localhost:8000/api/courses/getCourseByID?courseID=null":
        {
            return{
                ok: true,
                status: 200,
                json: async () => course,
            };
        }
        case "http://localhost:8000/api/courses/registered/new":
            {
                return{
                    ok: true,
                    status: 200,
                    json: async () => courseListResponse,
                };
            }
        case "http://localhost:8000/api/courses":
            {
                return{
                    ok: true,
                    status: 200,
                    json: async () => courseListResponse,
                };
            }
         case "http://localhost:8000/users/signup":
            {
                return{
                    ok: true,
                    status: 200,
                    json: async () => signupResponse,
                };
            }
        case "http://localhost:8000/api/courses/registered":
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