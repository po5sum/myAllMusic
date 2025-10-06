import './Pages.css'

export default function HomePage() {

    return (
        <div className="pagestyle">
            <h1 className='page-header'>Welcome to myAllMusic library!</h1>
            <h3 className='page-header'>This application allows you to access a list of albums and artists</h3>
            <h3 className='page-header'>You can scroll down at the bottom of the Albums Page/Artists Page <br />
                to add another album or artist to the database!<br /> Here's what they look like:</h3>
            <div className='img-cent'>
                <img src='addalbumexample.png' alt='addalbum' className='hp-img' />
                <img src='addartistexample.png' alt='addartist' className='hp-img' />
            </div>
            <h3 className='page-header'>You can also edit or delete albums/artists simply by clicking on the <br /> buttons that are located on the right of the cards</h3>
            <br />
            <br />
            <h2 className='page-header'>/!\ You cannot delete an artist if one or more album are linked to them /!\</h2>
        </div>
    );
}