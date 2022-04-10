//
//  Maps.swift
//  linage
//
//  Created by Martin on 09/04/2022.
//

import SwiftUI
import MapKit

struct Maps: View {
    let annotation = MKPointAnnotation()
    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 51.451_219, longitude: 5.480_006),
            span: MKCoordinateSpan(latitudeDelta: 0.2, longitudeDelta: 0.2)
        )
    var body: some View {
        Map(coordinateRegion: $region)
    }
}

struct Maps_Previews: PreviewProvider {
    static var previews: some View {
        Maps()
    }
}
