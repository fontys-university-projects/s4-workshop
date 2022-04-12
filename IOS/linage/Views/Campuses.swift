//
//  Campuses.swift
//  linage
//
//  Created by Martin on 11/04/2022.
//

import SwiftUI

struct Campuses: View {
    var location: Location
    var body: some View {
        HStack {
            location.image
                .resizable()
                .frame(width: 50, height: 50)
            Text(location.name)

            Spacer()
        }
    }
}

struct Campuses_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            Campuses(location: locations[0])
            Campuses(location: locations[1])
        }
        .previewLayout(.fixed(width: 300, height: 70))
    }
}
