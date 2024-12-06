import bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'

import { User, Federation, Publication, Rol } from './config.js'

const isDatabaseEmpty = async () => {
  const rolesCount = await Rol.count()
  const federationsCount = await Federation.count()
  const usersCount = await User.count()
  const publicationsCount = await Publication.count()

  return (rolesCount === 0 || federationsCount === 0 || usersCount === 0 || publicationsCount === 0)
}

const createData = async () => {
  const userOneId = randomUUID()
  const userTwoId = randomUUID()
  const userThreeId = randomUUID()

  return {
    rolesData: [{ rol: 'admin' }, { rol: 'user' }],
    federationsData: [{ federation: 'IPF' }, { federation: 'WRPF' }, { federation: 'IPL' }, { federation: 'AAP' }],
    usersData: [
      {
        id: userOneId,
        nick_name: 'john_doe',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('securepassword123', 10),
        RolId: 2
      },
      {
        id: userTwoId,
        nick_name: 'admin_user',
        name: 'Admin User',
        email: 'admin.user@example.com',
        password: await bcrypt.hash('adminpassword123', 10),
        RolId: 1
      },
      {
        id: userThreeId,
        nick_name: 'jane_smith',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('janeSecure123', 10),
        RolId: 2
      }
    ],
    publicationsData: [
      {
        title: 'Resultados del Campeonato Mundial de Powerlifting IPF 2024',
        content: 'El Campeonato Mundial de Powerlifting organizado por la IPF (International Powerlifting Federation) ha concluido con impresionantes marcas. En la categoría masculina de 83 kg, John Carter rompió el récord mundial con un deadlift de 340 kg. En la categoría femenina de 63 kg, Anna Kowalska destacó con un total de 535 kg, estableciendo un nuevo récord mundial en su categoría. Las competiciones fueron transmitidas en vivo desde Tokio, Japón, atrayendo a miles de espectadores en todo el mundo.',
        UserId: userOneId,
        FederationId: 1 // IPF
      },
      {
        title: 'WRPF: Nuevos récords nacionales en el Open de Moscú',
        content: 'El pasado fin de semana, la WRPF (World Raw Powerlifting Federation) celebró su Open anual en Moscú. La competencia fue un éxito rotundo con más de 200 atletas de todo el mundo. Destacó la actuación de Sergey Ivanov, quien levantó 410 kg en el squat raw, estableciendo un nuevo récord nacional. En la categoría femenina, Elena Petrova logró un impresionante bench press de 155 kg. El evento ha sido aclamado como uno de los más emocionantes del año en el circuito de powerlifting.',
        UserId: userTwoId,
        FederationId: 2 // WRPF
      },
      {
        title: 'La IPL anuncia su calendario de competiciones para 2025',
        content: 'La International Powerlifting League (IPL) ha publicado su esperado calendario de competiciones para 2025. Entre los eventos más destacados está el Campeonato Mundial, que se llevará a cabo en Sídney, Australia, en octubre del próximo año. Además, la liga introducirá una nueva categoría de peso en respuesta al creciente número de competidores en el rango de 57 kg. Esta medida busca promover la inclusión y fomentar la participación de más atletas en sus eventos.',
        UserId: userThreeId,
        FederationId: 3 // IPL
      },
      {
        title: 'Gran actuación de Argentina en el Campeonato Sudamericano de la AAP',
        content: 'El equipo argentino brilló en el Campeonato Sudamericano de la AAP (Asociación Argentina de Powerlifting), celebrado en Montevideo, Uruguay. En la categoría masculina de 93 kg, Luis González logró un impresionante total de 840 kg, llevándose el oro. Por su parte, María López, en la categoría femenina de 72 kg, obtuvo un récord sudamericano con un bench press de 125 kg. La AAP ha destacado el evento como un hito para el powerlifting en la región.',
        UserId: userOneId,
        FederationId: 4 // AAP
      },
      {
        title: 'Nuevas reglas en la IPF para la temporada 2025',
        content: 'La IPF ha anunciado cambios significativos en su reglamento para la próxima temporada. A partir de 2025, se implementará un nuevo sistema de puntuación que priorizará la consistencia en los levantamientos sobre los récords individuales. También se requerirá que todos los atletas utilicen un nuevo tipo de cinturón aprobado por la federación para garantizar mayor seguridad. Estas medidas han generado opiniones divididas entre atletas y entrenadores, pero la IPF asegura que buscan optimizar la transparencia y el desarrollo del deporte.',
        UserId: userTwoId,
        FederationId: 1 // IPF
      },
      {
        title: 'WRPF confirma la sede del próximo Campeonato Mundial',
        content: 'La WRPF ha confirmado que su Campeonato Mundial de 2025 se llevará a cabo en Las Vegas, Estados Unidos. Este evento promete ser uno de los más espectaculares hasta la fecha, con una bolsa de premios que supera los 100,000 dólares. Además, se espera que más de 500 atletas de 40 países participen, compitiendo en categorías raw y equipadas. Las entradas para el evento estarán disponibles a partir del próximo mes, según informó la organización.',
        UserId: userThreeId,
        FederationId: 2 // WRPF
      },
      {
        title: 'El Mundial de IPL 2024 concluye con récords históricos',
        content: 'El Mundial de la IPL 2024, celebrado en Ciudad de México, dejó un legado de récords históricos. La estadounidense Emily Davis rompió el récord de deadlift en la categoría femenina de 67.5 kg con un levantamiento de 240 kg. En la categoría masculina de 105 kg, Pedro Sánchez de México logró un total de 920 kg, estableciendo un récord para América Latina. La organización calificó el evento como uno de los mejores en la historia de la IPL.',
        UserId: userOneId,
        FederationId: 3 // IPL
      },
      {
        title: 'AAP organiza su primer Open Internacional en Buenos Aires',
        content: 'La AAP llevó a cabo su primer Open Internacional en Buenos Aires, atrayendo a atletas de toda Sudamérica. En el evento, destacaron las actuaciones de Carla Méndez de Chile, quien logró un squat raw de 180 kg en la categoría de 84 kg, y de Diego Pereira de Brasil, quien rompió el récord sudamericano con un bench press de 210 kg. Este evento marca un nuevo capítulo para la AAP, que busca expandirse a nivel internacional.',
        UserId: userTwoId,
        FederationId: 4 // AAP
      }
    ]
  }
}

export {
  isDatabaseEmpty,
  createData
}
