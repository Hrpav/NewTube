// testing for http://localhost:3000/protected/subroute
// if logged in, should say the message
// else will go to login/up screen

const Page = () => {
    return (
        <div>
            Only authorized users should see this subroute
        </div>
    );
};

export default Page;