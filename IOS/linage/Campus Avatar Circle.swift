//
//  Campus Avatar Circle.swift
//  linage
//
//  Created by Martin on 09/04/2022.
//

import SwiftUI

struct Campus_Avatar_Circle: View {
    var body: some View {
        Image("FontysR10")
            .clipShape(Circle())
            .overlay(Circle().stroke(.white, lineWidth: 4))
            .shadow(radius: 10)
    }
}

struct Campus_Avatar_Circle_Previews: PreviewProvider {
    static var previews: some View {
        Campus_Avatar_Circle()
            .previewInterfaceOrientation(.portraitUpsideDown)
    }
}
