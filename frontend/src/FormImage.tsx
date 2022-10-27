function imageForm(){
    return (
        <div>
            <form>
                <label>
                    Movie's title :
                    <textarea required/>
                </label>
                <label>
                    Release date :
                    <input type="date" required/>
                </label>
                <label>
                    Select movie's type :
                    <select required></select>
                </label>
            </form>
        </div>
    );
}

export default imageForm;

<div>
<form>
    <label>
      Movie's title : 
      <textarea required/>
    </label>
    <label>
      Date production :
      <input type='date' required></input>
    </label>
    Select movie's type :
    <select>
      <option value="SF">Science Fiction</option>
      <option value="Thriller">Thriller</option>
      <option value="Horror">Horror</option>
    </select>
    <label>
      Quick description : 
      <textarea required maxLength={500} placeholder="Write max 500 characters"/>
    </label>
    <label>
      to upload an image for the movie : 
      <input type="file" accept='image/*'></input>
    </label>
    <input type="submit" value="Confirm"/>
  </form>
</div>
    