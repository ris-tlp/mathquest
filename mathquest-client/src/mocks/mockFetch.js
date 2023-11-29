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

export default async function mockFetch(url){
    switch(url){
        case "http://localhost:8000/api/courses/getCourseByID?courseID=null":
        {
            return{
                ok: true,
                status: 200,
                json: async () => course,
            };
        }
        case "http://localhost:8000/api/courses/registered":
        default: {
            return{
                ok: true,
                status: 200,
                json: async () => courseListResponse,
            };
        }
    }
}