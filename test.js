/**
 * Created by Максим on 06.09.2017.
 */

 /////////////////////////////////////////////
var addNewUser = $("#Add_new");
var createPerson = $("#create_person");
var create = true;
addNewUser.click(function () {
    if (create == true) {
    	// Create form Person
        createPerson.append(
            '<div id="new_person"><div><label>Enter your Name</label><input id="Name" type="text" name="Name"></div>' +
            '<div><label>Enter your SurName</label><input id="SurName" type="text" name="SurName"></div>' +
            '<div><label>Enter your Phone</label><input id="Phone" type="tel" name="Phone"></div>' +
            '<div><label>Enter your E-mail</label><input id="Email" type="email" name="Mail"></div>' +
            '<div id="Add" class="btn btn-primary">Add new Person</div></div>'
        );
        create = false;

    }
    /////////////////////////////////////////////////////////////////
    let newPersone = $("#new_person");
    var add = $("#Add");
    add.click(function () {
        //checking  form
            
		var namePerson = $("#Name").val();
		var reName = /^[A-Z][a-zA-Z]{4,20}$/;
		var emailAddress = $("#Email").val();
		var reEmail = /[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;//washington@tim.ua
		var phoneNumber = $("#Phone").val();
		var rePhone = /^[+]\d[\d\(\)\ -]{4,13}\d$/;
		var surName = $("#SurName").val();
		if(namePerson == "" && surName == "" && phoneNumber == "" && emailAddress == ""){
			alert("Заполните форму")
			return false;
		}
        if(!reName.test(namePerson)){
            alert('Введите имя з большой буквы (не больше 20 символов)');
			return false;
		}
		if(!reName.test(surName)){
            alert('Введите фамилию з большой буквы (не больше 20 символов)');
			return false;
		}
		if (!rePhone.test(phoneNumber)) {
            alert('Введите номер телефона(начиная с плюса)');
			return false;
        }
		if(!reEmail.test(emailAddress)){
            alert('Введите E-mail');
			return false;
        }else{

            // Create new Person
            var person = new personLib.Person(
                personLib.getId(),
                $('input[name=Name]').val(),
                $('input[name=SurName]').val(),
                $('input[name=Phone]').val(),
                $('input[name= Mail]').val()
            );
			// Add Person to table
            personLib.addPerson(person);
        $('#personLib tbody').append(
            '<tr data-id="' + person.id + '"><td column="firstName" >' + person.firstName + '</td>' +
            '<td column="lastName">' + person.lastName + '</td>' +
            '<td column="phone">' + person.phone + '</td>' +
            '<td column="email">' + person.email + '</td><td>' + deletePerson() + '' + editPerson() + '</td></tr>');

		        
        function deletePerson() {
            return '<img class="imgDel" delete_id="' + person.id + '" width="20" height="20" src="img/delete.png" />';
        }

        function editPerson() {
            return '<img class="imgEdit" data-id="' + person.id + '" edit_id="' + person.id + '" width="20" height="20" src="img/buttonEdit.png" />';
        }

        
        //Delete Person

        $('.imgDel[delete_id=' + person.id + ']').click(function () {
            $(this).parents('tr').remove();
        });
        //Edit Person

        $('.imgEdit[edit_id=' + person.id + ']').click(function () {
		let id = $(this).data('id');
		let tr = $('tr[data-id='+id+']');
		let firstName = tr.find('td[column=firstName]').text();
		let lastName = tr.find('td[column=lastName]').text();
		let phone = tr.find('td[column=phone]').text();
		let email = tr.find('td[column=email]').text();
	if (create == true) {
        createPerson.append(
            '<form id="new_person_edit"><div><label>Enter your Name</label><input id="Edit_Name" type="text" name="Name" value="'+firstName+'"></div>' +
            '<div><label>Enter your SurName</label><input id="Edit_SurName" type="text" name="SurName" value="'+lastName+'"></div>' +
            '<div><label>Enter your Phone</label><input id="Edit_Phone" type="tel" name="Phone" value="'+phone+'"></div>' +
            '<div><label>Enter your E-mail</label><input id="Edit_Email" type="email" name="Mail" value="'+email+'"></div>' +
            '<div id="EditPerson" data-id = "'+id+'" class="btn btn-primary">Edit Data</div></form>'
        );
       
		var editPerson = $("#EditPerson");
		editPerson.click(function( e ){
		
		var editNamePerson = $("#Edit_Name").val();
		var editEmailAddress = $("#Edit_Email").val();
		var editPhoneNumber = $("#Edit_Phone").val();
		var editSurName = $("#Edit_SurName").val();
			if(editNamePerson == "" && editSurName == "" && editPhoneNumber == "" && editEmailAddress == ""){
			alert("Заполните форму")
			return false;
		}
        if(!reName.test(editNamePerson)){
            alert('Введите имя з большой буквы (не больше 20 символов)');
			return false;
		}
		if(!reName.test(editSurName)){
            alert('Введите фамилию з большой буквы (не больше 20 символов)');
			return false;
		}
		if (!rePhone.test(editPhoneNumber)) {
            alert('Введите номер телефона(начиная с плюса)');
			return false;
        }
		if(!reEmail.test(editEmailAddress)){
            alert('Введите E-mail');
			return false;
        }else{
			e.preventDefault();
		
			// Edit form
			let form = $( '#new_person_edit' ).get(0);
					
			let id = $(this).data('id');
			let tr = $('tr[data-id='+id+']');
			tr.find('td[column=firstName]').html( form.elements['Name'].value );
			tr.find('td[column=lastName]').html( form.elements['SurName'].value );
			tr.find('td[column=phone]').html(form.elements['Phone'].value);
			tr.find('td[column=email]').html(form.elements['Mail'].value);
		
			
          form.remove();
		  }
		});
    }
        });
        newPersone.remove();
        create = true;
		}
    });
///////Проверка



});

function Person( id, firstName, lastName, phone, email ){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
}

var personLib = {
    id: 0,
    deleting: 0,
    storageKey: 'personLib',
    person: []
};

personLib.Person = function( id, firstName, lastName, phone, email ){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
};
personLib.getId = function(){
    return this.id++;
};
personLib.addPerson = function( person ){
    this.person.push( person );
}; 




