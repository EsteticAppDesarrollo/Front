export default function Animations(){
    document.getElementById('usuarioCircle').addEventListener('click', function () {
        document.getElementById('divInicio').classList.toggle('none');
        document.getElementById('divUsuario').classList.toggle('none');
        document.getElementById('divUsuario').classList.add('animation');
        document.getElementById('divFormas').classList.remove('none');
    });
    document.getElementById('medicoCircle').addEventListener('click', function () {
        document.getElementById('divInicio').classList.toggle('none');
        document.getElementById('divUsuario').classList.toggle('none');
        document.getElementById('divUsuario').classList.add('animation');
        document.getElementById('divFormas').classList.add('none');
    });
    document.getElementById('back').addEventListener('click', function () {
        document.getElementById('divInicio').classList.toggle('none');
        document.getElementById('divInicio').classList.add('animation');
        document.getElementById('divUsuario').classList.toggle('none');
    });
}
